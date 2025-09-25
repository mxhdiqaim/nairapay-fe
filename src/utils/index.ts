export const getEnvVariable = (envKey: string) => {
    const value = import.meta.env[envKey];
    if (!value) {
        throw new Error(`${envKey} variable is not set`);
    }

    return value;
};
