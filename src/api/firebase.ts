import axios from 'axios';
const FIREBASE_PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID!;
const FIREBASE_API_KEY = import.meta.env.VITE_FIREBASE_API_KEY!;

const axiosClient = axios.create({
    baseURL: `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents`,
    headers: {
        'Content-Type': 'application/json'
    }
})

export const firebaseAuthApi = {
    register: async (email: string, password: string) => {
        const response = await axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`,
            {
                email,
                password,
                returnSecureToken: true,
            }
        )
        return response
    },

    login: async (email: string, password: string) => {
        const response = await axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
            {
                email,
                password,
                returnSecureToken: true,
            }
        )
        return response
    },
    resetPassword: async (email: string) => {
        const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${FIREBASE_API_KEY}`, {
            requestType: 'PASSWORD_RESET',
            email,
        })
        return response
    },
    changePassword: async (idToken: string, newPassword: string) => {
        const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${FIREBASE_API_KEY}`, {
            idToken,
            password: newPassword,
            returnSecureToken: true,
        })
        return response
    }
};
const formatFirestoreData = (data: Record<string, any>) => {
    const formattedData: Record<string, any> = {};

    Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            formattedData[key] = {
                arrayValue: {
                    values: value.map((item) => ({ stringValue: item.toString() })),
                },
            };
        } else {
            formattedData[key] = { stringValue: value.toString() };
        }
    });

    return { fields: formattedData };
};
const parseFirestoreValue = (value: any): any => {
    if (value.stringValue !== undefined) return value.stringValue;
    if (value.integerValue !== undefined) return parseInt(value.integerValue, 10);
    if (value.doubleValue !== undefined) return parseFloat(value.doubleValue);
    if (value.booleanValue !== undefined) return value.booleanValue;
    if (value.arrayValue !== undefined) {
        return (value.arrayValue.values || []).map(parseFirestoreValue);
    }
    if (value.mapValue !== undefined) {
        return parseFirestoreData({ fields: value.mapValue.fields });
    }
    return value;
}
export const parseDocumentId = (documentName: string): string => {
    const parts = documentName.split('/');
    return parts[parts.length - 1]; // Lấy phần cuối cùng của đường dẫn
};
//đm firestore, firestore absolutely bullshit, no need theses fk parse function when you have real json from backend
export const parseFirestoreData = (data: any) => {
    if (data.fields) {
        const parsedObject: any = {};
        for (const [key, value] of Object.entries(data.fields)) {
            parsedObject[key] = parseFirestoreValue(value);
        }
        return parsedObject;
    }
    return null;
};
export const firestoreApi = {
    getDocuments: async (collection: string, token: string, userId: string) => {
        const response = await axiosClient.post(
            `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents:runQuery`,
            {
                structuredQuery: {
                    from: [{ collectionId: collection }],
                    where: {
                        fieldFilter: {
                            field: { fieldPath: 'userId' },
                            op: 'EQUAL',
                            value: { stringValue: userId },
                        },
                    },
                },
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return response.data || [];
    },

    addDocument: async (collection: string, data: Note, token: string, userId: string) => {

        const response = await axiosClient.post(
            `/${collection}`,
            { ...formatFirestoreData({ ...data, userId: userId }) },
            { headers: { Authorization: `Bearer ${token}` } }
        )
        return response.data
    },


    updateDocument: async (collection: string, docId: string, data: Note, token: string, userId: string) => {
        const response = await axiosClient.patch(
            `/${collection}/${docId}`,
            { ...formatFirestoreData({ ...data, userId: userId }) },
            { headers: { Authorization: `Bearer ${token}` } }
        )
        return response.data

    },

    deleteDocument: async (collection: string, docId: string, token: string) => {
        await axiosClient.delete(`/${collection}/${docId}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
    },


};
