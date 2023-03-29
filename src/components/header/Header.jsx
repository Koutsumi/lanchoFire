function Header(){

    return(
        <header className="mySection bg-[#131B52]">

        <div className="row text-white">
            <div className="text-[2em] w-[40%]">
                <a href="/">
                    <h1>Lancho<span className="text-yellow-400">Fire</span></h1>
                </a>
            </div>
            <nav>
                <ul className="flex flex-row items-center justify-between">
                    <li><a href="/login">Login</a> </li>
                    {/* <li><a href="/newAccount">Nova conta</a> </li> */}
                </ul>
            </nav>
            
        </div>

        </header>
    )
   
}

export default Header