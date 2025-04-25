'use client';

import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { LogIn } from "lucide-react";


export default function ErrorAuth() {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
        <div className="max-w-lg w-full text-center space-y-6">
            <h1 className="text-6xl font-bold text-gray-900">401</h1>
            <p className="text-2xl font-semibold text-gray-800">Доступ запрещён</p>
            <p className="text-gray-600">
                У вас нет доступа к этой странице. Пожалуйста, выполните вход, чтобы продолжить.
            </p>

            <Button
                onClick={() => signIn()}
            >
                <LogIn className="w-5 h-5" />
                Войти через аккаунт
            </Button>
        </div>
    </div>
    );
}