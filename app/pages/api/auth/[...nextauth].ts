import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';

function getEnvVariable(key: string): string {
    const value = process.env[key];
    if (!value) {
      throw new Error(`Environment variable ${key} is missing`);
    }
    return value;
  }
  
  export default NextAuth({
    providers: [
      GoogleProvider({
        clientId: getEnvVariable('GOOGLE_CLIENT_ID'),
        clientSecret: getEnvVariable('GOOGLE_CLIENT_SECRET'),
      }),
      GitHubProvider({
        clientId: getEnvVariable('GITHUB_CLIENT_ID'),
        clientSecret: getEnvVariable('GITHUB_CLIENT_SECRET'),
      }),
    ],
    secret: getEnvVariable('NEXTAUTH_SECRET'),
  });
  