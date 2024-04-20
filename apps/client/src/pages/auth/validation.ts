import * as yup from 'yup';

// https://github.com/jquense/yup/issues/507
const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const signInYupSchema = yup.object().shape({
    email: yup.string().required('Email is required').matches(emailRegex, {
        message: 'Invalid email format',
    }),
    password: yup.string().required('Password is required'),
});

export const signUpYupSchema = signInYupSchema.concat(
    yup.object().shape({
        name: yup.string().required('Name is required'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password'), undefined], 'Passwords do not match'),
    })
);
