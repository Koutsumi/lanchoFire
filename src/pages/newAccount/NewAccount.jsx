function NewAccount(){
    return(
        <section className="mySection min-h-screen bg-[#090E34]">
            
            <div className="divCol min-h-[70vh] text-white">

                <h1 className="text-[1.5em] uppercase tracking-widest">Nova conta</h1>

                <form action="" className="flex flex-col m-6">
                    <label htmlFor="" className="text-left">E-mail</label>
                    <input className="p-1 rounded mb-4" type="email" placeholder="exemplo@lanchofire.com" />
                    <label htmlFor="" className="text-left">Senha</label>
                    <input className="p-1 rounded mb-4" type="password" />
                    <label htmlFor="" className="text-left">Confirme sua senha</label>
                    <input className="p-1 rounded mb-4" type="password" />
                    <button type="submit" className="btn-primary mt-4">Criar conta</button>
                </form>

            </div>

        </section>

    )
}

export default NewAccount