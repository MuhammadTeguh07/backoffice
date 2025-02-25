"use client"

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
import { useFormik } from "formik";
import * as Yup from 'yup';
import Swal from "sweetalert2";
import { authRegister } from "@/fetch/auth"

export function Register() {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required('Nama harus diisi'),
            email: Yup.string().required('Email harus diisi'),
            password: Yup.string().required('Password harus diisi'),
        }),
        enableReinitialize: true,
        onSubmit: async (values, { setStatus, setSubmitting }) => {
            try {
                const response = await authRegister(values.name, values.email, values.password);

                if (response.data.success) {
                    Swal.fire({
                        icon: 'success',
                        title: response.data.message,
                        showConfirmButton: false,
                        timer: 1500,
                        heightAuto: false
                    }).then((res) => {
                        window.location.href = "/";
                    })
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
                    <CardTitle className="text-2xl">Register</CardTitle>
                    <CardDescription>
                        Masukkan email dan password Anda di bawah ini untuk membuat akun
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Nama</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Masukkan Nama"
                                    {...formik.getFieldProps('name')}
                                />
                                {formik.touched.name && formik.errors.name && (
                                    <div className="flex items-center">
                                        <Label className="label-text text-xs text-red-600">{formik.errors.name}</Label>
                                    </div>
                                )}
                            </div>
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
                                Register
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
