import Image from "next/image";
import logoImg from "@/public/assets//Logo.png"

export const Logo = () => {
    return (
        <>
            <Image src={logoImg} width={100} height={100} alt="Logo"/>
        </>
    )
};