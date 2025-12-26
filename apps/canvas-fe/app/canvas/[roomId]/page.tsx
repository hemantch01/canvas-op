import { RoomCanvas } from "@/app/components/roomCanvas";
export default async function Room({
    params
}: {
    params: {
        roomId: string
    }
}) {
    const roomId = (await params).roomId;
    return <RoomCanvas roomId={roomId} />
}
