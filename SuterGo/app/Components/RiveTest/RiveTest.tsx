import React, { useRef } from "react"
import Rive, { RiveRef } from "rive-react-native"
import rives from "../../assets/rives"
import { Button } from "react-native";

const RiveTest = () => {

    const riveRef = useRef<RiveRef>(null);

    const handleIdle = () => {
        riveRef.current?.setInputState("State Machine 1", "Number 1", 0)
    }

    const handleAttack = () => {
        riveRef.current?.setInputState("State Machine 1", "Number 1", 1)
    }

    const handleDamage = () => {
        riveRef.current?.setInputState("State Machine 1", "Number 1", 2)
    }

    const handleDeath = () => {
        riveRef.current?.setInputState("State Machine 1", "Number 1", 3)
    }

    return (
        <>
            {/* <Rive
                ref={riveRef}
                resourceName={rives.boss_reverse_triangle}
                style={{ width: 300, height: 300 }} 
            /> */}
            <Button onPress={handleIdle} title="Idle"/>
            <Button onPress={handleAttack} title="Attack"/>
            <Button onPress={handleDamage} title="Damage"/>
            <Button onPress={handleDeath} title="Death"/>
        </>
    )
}

export default RiveTest