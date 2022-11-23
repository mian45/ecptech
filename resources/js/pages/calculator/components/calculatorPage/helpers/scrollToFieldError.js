import { useEffect } from "react";
export const ScrollToFieldError = ({
    scrollBehavior = { behavior: "smooth", block: "center" },
    formProps,
}) => {
    const { submitCount, isValid, errors } = formProps;
    useEffect(() => {
        if (isValid) return;
        const fieldErrorNames = getFieldErrorNames(errors);
        if (fieldErrorNames.length <= 0) return;
        const element = document.getElementById(fieldErrorNames[0]);
        if (!element) return;
        // Scroll to first known error into view
        element.scrollIntoView(scrollBehavior);
        // Formik doesn't (yet) provide a callback for a client-failed submission,
        // thus why this is implemented through a hook that listens to changes on
        // the submit count.
    }, [submitCount]); // eslint-disable-line react-hooks/exhaustive-deps
    return null;
};
export const getFieldErrorNames = (formikErrors) => {
    const transformObjectToDotNotation = (obj, prefix = "", result = []) => {
        Object.keys(obj).forEach((key) => {
            const value = obj[key];
            if (!value) return;
            const nextKey = prefix ? `${prefix}.${key}` : key;
            if (typeof value === "object") {
                transformObjectToDotNotation(value, nextKey, result);
            } else {
                result.push(nextKey);
            }
        });
        return result;
    };
    return transformObjectToDotNotation(formikErrors);
};
