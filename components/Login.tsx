'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormik } from "formik"
import * as Yup from 'yup';
import Swal from "sweetalert2";
import { authLogin } from "@/fetch/auth"
import Cookies from 'js-cookie';

export function Login() {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().required('Email harus diisi'),
            password: Yup.string().required('Password harus diisi'),
        }),
        enableReinitialize: true,
        onSubmit: async (values, { setStatus, setSubmitting }) => {
            try {
                const response = await authLogin(values.email, values.password);

                if (response.data.success) {
                    Swal.fire({
                        icon: 'success',
                        title: response.data.message,
                        showConfirmButton: false,
                        timer: 1500,
                        heightAuto: false
                    })

                    Cookies.set('authToken', response.data.data, { expires: 9999, path: '/' });
                    window.location.href = "/dashboard";
                }
            } catch (error: any) {
                Swal.fire({
                    icon: 'error',
                    title: error.response.data.message,
                    showConfirmButton: false,
                    timer: 1500,
                    heightAuto: false
                })
            }
        }
    });

    return (
        <div className={"flex flex-col gap-6"}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Masukkan email dan password Anda di bawah ini untuk masuk ke akun Anda
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Masukkan Email"
                                    {...formik.getFieldProps('email')}
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <div className="flex items-center">
                                        <Label className="label-text text-xs text-red-600">{formik.errors.email}</Label>
                                    </div>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Masukkan Password"
                                    {...formik.getFieldProps('password')}
                                />
                                {formik.touched.password && formik.errors.password && (
                                    <div className="flex items-center">
                                        <Label className="label-text text-xs text-red-600">{formik.errors.password}</Label>
                                    </div>
                                )}
                            </div>
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                            <div className="mt-4 text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <a href="/register" className="underline underline-offset-4">
                                    Sign up
                                </a>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
