import NextAuth, {Account, Profile} from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    authorization: {
        params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code"
        }
    },
    callbacks: {
        async signIn({ account, profile }: { account: Account | null, profile?: Profile | undefined }) {
            const allowedEmails = process.env.ALLOWED_USERS;
            if (!allowedEmails) return false;

            const allowedEmailsArr = allowedEmails.split(';');

            return allowedEmailsArr.includes(profile?.email ?? "");
        }
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };