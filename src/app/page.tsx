"use client"
import {useCallback, useState} from "react";
import {Main} from "./main";

export default function Home() {
    const [nonce, setNonce] = useState(0)
    const reset = useCallback((message: string) => {
        window.alert(message)
        setNonce(n => n + 1)
    }, [])

    return <Main key={nonce} reset={reset}/>
}
