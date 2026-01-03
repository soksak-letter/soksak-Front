import type { ReactNode } from "react";

type HeaderProps = {
    children: ReactNode;
    className?: string; //스타일 추가 혹은 수정
    
}

const Header = ({ children,className } : HeaderProps ) => {
    return (
        <header className={`flex w-full max-w-[375px] mx-auto
             px-[10px]  justify-center items-center relative
             bg-white ${className}`}>
            {children}
        </header>
    );
}

export default Header;