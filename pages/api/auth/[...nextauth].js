import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions = {
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {},
            async authorize(credentials, req) {
                const { email, password } = credentials;

                const data = {
                    "username": email,
                    "password"  : password,
                };
        
                const response = await fetch('https://l8bzcyhc56.execute-api.us-east-1.amazonaws.com/api/signin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                }).then((response) => {
                    // Get the status code
                    const statusCode = response.status;
        
                    // Handle the response based on the status code
                    if (statusCode === 200) {
                        router.push('/');
                    } else if (statusCode === 401) {
                        // setErrorMessage('Invalid username or password');
                    } else {
                        // setErrorMessage('Error happend please contact admin');
                    }
        
                    // Return the response
                    return response;
                });

                // if (email !== "john@gmail.com" || password !== "1234") {
                //     throw new Error("invalid credentials");
                // }

                // if everything is fine
                return {
                    id: "1234",
                    name: "John Doe",
                    email: "john@gmail.com",
                    role: "admin",
                };
            }
        })
    ],
    pages: {
        signIn: "/auth/signin",
    },
}

export default NextAuth(authOptions)