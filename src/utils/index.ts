export const getEnvVariable = (envKey: string, env: ImportMetaEnv) => {
    const value = env[envKey];
    if (!value) {
        throw new Error(`${envKey} variable is not set`);
    }

    return value
};
