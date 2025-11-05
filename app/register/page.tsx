'use client'

import React, {useState} from 'react'
import {Eye, EyeOff} from 'lucide-react'
import {useRouter} from 'next/navigation'

export default function RegisterPage(){
    const router = useRouter();

    const [isVisible, setIsVisible] = useState({
        password:false,
        confirmPassword:false
    });

    const [formData, setFormData] = useState({
    nomeCompleto: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
    });

    const [errors, setErrors] = useState({
    nomeCompleto: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
     });

    function toggleVisibility(field: 'password'|'confirmPassword') {
        setIsVisible(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const {value} = event.target;
        const name = event.target.name as keyof typeof formData;
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));

        if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
        }
        
        if ((name === 'password' || name === 'confirmPassword') && errors.confirmPassword === 'As senhas não são compatíveis') {
        setErrors(prev => ({ ...prev, confirmPassword: '' }));
        }
    }
    
    function handleRegister(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const { nomeCompleto, username, email, password, confirmPassword } = formData;
        
        // Regex para validação de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const newErrors = {
        nomeCompleto: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
        };

        // Validação 1: Campos obrigatórios
        if (!nomeCompleto) newErrors.nomeCompleto = "Campo obrigatório";
        if (!username) newErrors.username = "Campo obrigatório";
        if (!email) newErrors.email = "Campo obrigatório";
        if (!password) newErrors.password = "Campo obrigatório";
        if (!confirmPassword) newErrors.confirmPassword = "Campo obrigatório";

        // Validação 2: Formato do E-mail
        // Só executa se o campo 'email' não estiver vazio
        if (email && !emailRegex.test(email)) {
        newErrors.email = "Formato de e-mail inválido";
        }
        
        // Validação 3: Senhas compatíveis
        // Só executa se ambas as senhas não estiverem vazias
        if (password && confirmPassword && password !== confirmPassword) {
        newErrors.confirmPassword = "As senhas não são compatíveis";
        }
        setErrors(newErrors);
        if (Object.values(newErrors).every(error => error === '')) {
            alert("Cadastro realizado com sucesso!");
            console.log("Cadastro feito!");
            console.log("Dados do formulário:", formData);
            //router.push('/login'); // Direciona para a página de login após o usuário clicar em "ok"
            
        } else {
        console.log("Validação falhou. Erros:", newErrors);
        }
  }

    return (
        <div className="w-screen h-screen overflow-hidden flex items-center bg-[#f6f3e4]">
            <div className="w-1/2 h-screen pt-35 pl-72">
                <form 
                    onSubmit={handleRegister}
                    noValidate
                    className="w-5/6 h-screen pt-50 px-50 gap-15 rounded-t-[96px] flex flex-col items-center rounded-b-none bg-black">
                    <h2 className="text-8xl pb-15 text-center font-extrabold font-[League Spartan] text-[#f6f3e4]">
                        CRIE SUA CONTA
                    </h2>
                    <div className="relative w-5/6 h-1/16">
                        <input 
                            type="text" 
                            placeholder="Nome Completo" 
                            name="nomeCompleto" 
                            value={formData.nomeCompleto} 
                            onChange={handleChange} 
                            className="placeholder-gray-400 text-6xl w-full h-full rounded-full pl-10 bg-[#f6f3e4]">
                        </input>
                        {errors.nomeCompleto && (
                        <p className="absolute bottom-0 translate-y-full left-10 pt-2 text-red-500 text-4xl font-[League Spartan]">
                            {errors.nomeCompleto}
                        </p>
                        )}
                    </div>
                    <div className="relative w-5/6 h-1/16">
                        <input 
                            type="text" 
                            placeholder="Username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="placeholder-gray-400 text-6xl w-full h-full rounded-full pl-10 bg-[#f6f3e4]">
                        </input>
                        {errors.username && (
                        <p className="absolute bottom-0 translate-y-full left-10 pt-2 text-red-500 text-4xl font-[League Spartan]">
                            {errors.username}
                        </p>
                        )}
                    </div>
                    <div className="relative w-5/6 h-1/16">
                        <input 
                            type="email" 
                            placeholder="E-mail"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="placeholder-gray-400 text-6xl w-full h-full rounded-full pl-10 bg-[#f6f3e4]">
                        </input>
                        {errors.email && (
                        <p className="absolute bottom-0 translate-y-full left-10 pt-2 text-red-500 text-4xl font-[League Spartan]">
                            {errors.email}
                        </p>
                        )}
                    </div>
                    <div className="relative w-5/6 h-1/16">
                    <input 
                        type={isVisible.password ? "text":"password"} 
                        placeholder='Senha'
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="placeholder-gray-400 text-6xl w-full h-full rounded-full pl-10 pr-20 bg-[#f6f3e4]">
                    </input>
                        <button
                            type="button"
                            onClick={() => toggleVisibility('password')}
                            className="absolute inset-y-0 right-0 flex items-center pr-6 text-gray-600">
                            {isVisible.password ? (
                                <EyeOff className="h-12 w-12" />
                            ) : (
                                <Eye className="h-12 w-12" />
                            )}
                        </button>
                        {errors.password && (
                        <p className="absolute bottom-0 translate-y-full left-10 pt-2 text-red-500 text-4xl font-[League Spartan]">
                            {errors.password}
                        </p>
                        )}
                    </div>
                    <div className="relative w-5/6 h-1/16">
                        <input 
                            type={isVisible.confirmPassword ? "text":"password"} 
                            placeholder='Confirmar Senha'
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="placeholder-gray-400 text-6xl w-full h-full rounded-full pl-10 pr-20 bg-[#f6f3e4]">
                        </input>
                        <button
                            type="button"
                            onClick={() => toggleVisibility('confirmPassword')}
                            className="absolute inset-y-0 right-0 flex items-center pr-6 text-gray-600">
                            {isVisible.confirmPassword ? (
                                <EyeOff className="h-12 w-12" />
                            ) : (
                                <Eye className="h-12 w-12" />
                            )}
                        </button>
                        {errors.confirmPassword && (
                        <p className="absolute bottom-0 translate-y-full left-10 pt-2 text-red-500 text-4xl font-[League Spartan]">
                            {errors.confirmPassword}
                        </p>
                        )}
                    </div>
                    <button 
                        type="submit" 
                        className="bg-[#6a38f3] w-5/6 h-1/12 text-6xl text-center font-bold font-[League Spartan] text-[#f6f3e4] rounded-full m-20">
                            CRIAR CONTA
                    </button>
                    <div className="w-5/6 text-start text-5xl font-[League Spartan] text-[#f6f3e4]">
                        Já possui uma conta?{" "}
                        <a href="/login" 
                        className="text-[#6a38f3] font-semibold hover:underline">
                            Login
                        </a>
                    </div>
                </form>
            </div>
            <div className="w-1/2 h-screen flex flex-col items-center justify-center pt-150 px-96">
                <img 
                    src="/LOGO.png" 
                    alt="Logo" 
                    className="w-3/4 h-auto">
                </img>
                <img 
                    src="/StockLee.png" 
                    alt="Personagem" 
                    className="w-7/10 h-auto">
                </img>
            </div>
        </div>
    );
}