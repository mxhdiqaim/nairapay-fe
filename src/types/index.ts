import * as yup from "yup";
import { isAddress } from "viem";

export type DrawerAnchor = "left" | "bottom" | "right" | "top";

export const validationSchema = yup.object({
    recipient: yup
        .string()
        .required("Recipient address is required")
        .test("is-address", "Invalid wallet address", (value) => (value ? isAddress(value) : false)),
    amount: yup
        .number()
        .typeError("Amount must be a valid number")
        .required("Amount is required")
        .positive("Amount must be greater than 0"),
});

export type FormData = yup.InferType<typeof validationSchema>;
