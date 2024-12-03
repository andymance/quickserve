import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('auth.db');

// Initialize database
export const initDB = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT, firstName TEXT, lastName TEXT, email TEXT, contactNumber TEXT, address TEXT, profilePicture TEXT);',
                [],
                () => {
                    console.log('Database and table created successfully');
                    resolve();
                },
                (_, error) => {
                    console.error('Error creating table:', error);
                    reject(error);
                }
            );
        });
    });
};

export const registerUser = (username, password, userProfile) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO users (username, password, firstName, lastName, email, contactNumber, address, profilePicture) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [username, password, userProfile.firstName, userProfile.lastName, userProfile.email, userProfile.contactNumber, userProfile.address, userProfile.profilePicture],
                (_, result) => {
                    console.log('User  registered successfully');
                    resolve(result);
                },
                (_, error) => {
                    console.error('Error registering user:', error);
                    reject(error);
                }
            );
        });
    });
};

export const loginUser = (username, password) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM users WHERE username = ? AND password = ?',
                [username, password],
                (_, { rows: { _array } }) => {
                    console.log('Login query successful');
                    resolve(_array.length > 0);
                },
                (_, error) => {
                    console.error('Error logging in:', error);
                    reject(error);
                }
            );
        });
    });
};

export const getUserProfile = (username) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM users WHERE username = ?',
                [username],
                (_, { rows: { _array } }) => {
                    console.log('User  profile fetched successfully');
                    resolve(_array.length > 0 ? _array[0] : null);
                },
                (_, error) => {
                    console.error('Error fetching user profile:', error);
                    reject(error);
                }
            );
        });
    });
};

export const updateUserProfile = (updatedProfile) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'UPDATE users SET firstName = ?, lastName = ?, email = ?, contactNumber = ?, address = ?, profilePicture = ? WHERE username = ?',
                [updatedProfile.firstName, updatedProfile.lastName, updatedProfile.email, updatedProfile.contactNumber, updatedProfile.address, updatedProfile.profilePicture, updatedProfile.username],
                (_, result) => {
                    console.log('User  profile updated successfully');
                    resolve(result);
                },
                (_, error) => {
                    console.error('Error updating user profile:', error);
                    reject(error);
                }
            );
        });
    });
};