'use client'

import React, {useState} from 'react'
import {Eye, EyeOff} from 'lucide-react'

export default function RegisterPage(){
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

    const [passwordError, setPasswordError] = useState('');

    function toggleVisibility(field: 'password'|'confirmPassword') {
        setIsVisible(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    }
    
    function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setPasswordError('As senhas não são compatíveis');
      return;
    }

    // Se chegou aqui, as senhas batem
    setPasswordError('');
    console.log("Cadastro feito!");
    console.log("Dados do formulário:", formData); 
    // lógica para enviar para a API
    }

    return (
        <div className="w-screen h-screen overflow-hidden flex items-center bg-[#f6f3e4]">
            <div className="w-1/2 h-screen pt-35 pl-72">
                <form 
                    onSubmit={handleRegister} 
                    className="w-5/6 h-screen pt-50 px-50 gap-10 rounded-t-[96px] flex flex-col items-center rounded-b-none bg-black">
                    <h2 className="text-8xl pb-15 text-center font-extrabold font-[League Spartan] text-[#f6f3e4]">
                        CRIE SUA CONTA
                    </h2>
                    <input 
                        type="text" 
                        placeholder="Nome Completo" 
                        name="nomeCompleto" 
                        value={formData.nomeCompleto} 
                        onChange={handleChange} 
                        className="placeholder-gray-400 text-6xl w-5/6 h-1/16 rounded-full pl-10 bg-[#f6f3e4]">
                    </input>
                    <input 
                        type="text" 
                        placeholder="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="placeholder-gray-400 text-6xl w-5/6 h-1/16 rounded-full pl-10 bg-[#f6f3e4]">
                    </input>
                    <input 
                        type="email" 
                        placeholder="E-mail"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="placeholder-gray-400 text-6xl w-5/6 h-1/16 rounded-full pl-10 bg-[#f6f3e4]">
                    </input>
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
                        {passwordError && (
                            <p className="absolute bottom-0 translate-y-full left-10 pt-6 text-red-500 text-5xl font-[League Spartan]">
                                {passwordError}
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