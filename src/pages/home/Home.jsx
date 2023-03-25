import React from 'react';

function Home(){

    return(
        <section className="mySection min-h-[93vh] bg-[#090E34]">

            <h1 className="text-[1.5em] text-white uppercase tracking-[0.5em]">Cardápio</h1>
            
            <div className="div">

                <div className='blocks'>

                    <h2 className=' uppercase tracking-[0.1em] text-[#090E34] bg-yellow-400 rounded w-[90%] px-5 py-1'>Entradas</h2>

                    <div className='divRow text-white mt-4'>
                        <div className=''>
                            <h3>Nome item</h3>
                            <p>Igredientes</p>
                        </div>
                        <p>R$10,99</p>

                    </div>

                </div>

                <div className='blocks'>

                <h2 className=' uppercase tracking-[0.1em] text-[#090E34] bg-yellow-400 rounded w-[90%] px-5 py-1'>Lanches</h2>
                    

                </div>

                <div className='blocks'>

                <h2 className=' uppercase tracking-[0.1em] text-[#090E34] bg-yellow-400 rounded w-[90%] px-5 py-1'>Bebidas</h2>
                    

                </div>

            </div>

        </section>

    )
}

export default Home