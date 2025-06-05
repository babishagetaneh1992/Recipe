
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import User from '@/models/user'

export const authOptions = {
        providers: [
          CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials) {
              const { email, password } = credentials
              try {
              await connectDB(); // Connect to MongoDB
      
              const user = await User.findOne({
                email: email,
              });
      
              if (!user) {
                console.log("User not found")
              return null
              }
              
              console.log("Found user:", user)
              console.log("password:", password);
              console.log("user.password:", user.password);

              // Check if the password field exists
    if (!user.password) {
      console.error("User password is undefined");
      return null;
    }
              const isPasswordCorrect = await bcrypt.compare(
                password,
                user.password
              );
      
              if (!isPasswordCorrect) {
                console.log("Incorrect Password")
                return null;
              }
      
              // Return the user object (without the hashedPassword for security)
              return { id: user._id.toString(), email: user.email, role: user.role, name: user.name }; // Convert _id to string
              } catch (error) {
                console.log("error:", error)
              }
            },
          }),
        ],
        session: {
          strategy: 'jwt', // Use JWT for session management
        },
        secret: process.env.NEXTAUTH_SECRET, // Very important: set this in your .env file
        callbacks: {
          jwt: async ({ token, user }) => {
            if (user) {
              token.id = user.id;
              token.name = user.name
              token.email = user.email;
              token.role = user.role
            }
            return token;
          },
          session: async ({ session, token }) => {
            if (token) {
              session.user.id = token.id;
              session.user.name = token.name;
              session.user.email = token.email;
              session.user.role = token.role
            }
            return session;
          },
        },
        pages: {
          signIn: '/login', // Custom login page
        },
};

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };