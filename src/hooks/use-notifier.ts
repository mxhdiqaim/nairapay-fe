import { useSnackbar, type VariantType } from "notistack";

const useNotifier = () => {
    const { enqueueSnackbar } = useSnackbar();

    return (message: string, variant: VariantType = "info") => {
        enqueueSnackbar(message, { variant });
    };
};

export default useNotifier;
