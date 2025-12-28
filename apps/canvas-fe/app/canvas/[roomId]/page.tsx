import { Icon } from "@/app/components/button";
import { RoomCanvas } from "@/app/components/roomCanvas";
import { Pencil, RectangleHorizontalIcon } from "lucide-react";
export default async function Room({
    params
}: {
    params: {
        roomId: string
    }
}) {
    const roomId = (await params).roomId;
    return <>
    <RoomCanvas roomId={roomId} />
    <div>
        <Icon children={<Pencil/>} onClick={()=>{}}/>
        <Icon children={<RectangleHorizontalIcon/>}onClick={()=>{}}/>
        <Icon children= {<circle/>} onClick={()=>{}}/>
    </div>
    </>
}
