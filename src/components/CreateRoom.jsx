import {useState} from 'react';
import {
    uniqueNamesGenerator,
    adjectives,
    colors,
    animals
} from 'unique-names-generator';

import {supabase} from '../api/supabase.ts';
import Spinner from './Spinner';

const defaultName = uniqueNamesGenerator({
    dictionaries: [colors, adjectives, animals],
    separator: '-'
});

export default function CreateRoom() {
    const [roomName, setRoomName] = useState(defaultName);
    const [status, setStatus] = useState({error: '', success: false, isLoading: false});


    const handleSendLink = async () => {
        setStatus({error: '', success: false, isLoading: true})

        const { error } = await supabase
            .from('rooms')
            .insert([{ name: roomName }]);

        if (error?.message) {
            setStatus(() => ({
                error: error.message,
                success: false,
                isLoading: false,
            }))
        } else {
            setStatus({error: '', success: true, isLoading: false});
            location.href = '/room#' + roomName;
        }
    }

    return (
        <div className="w-96 mx-auto">
            <div className="pb-2">
                Choose a unique name for your room:
            </div>
            <div>
                <input
                    disabled={status.isLoading}
                    className="input-field" type="text" placeholder="Your room name" id="room" value={roomName}
                    onChange={(v) => setRoomName(v.target.value)}/>
                {status.error ? <div className="text-sm text-red-400">{status.error}</div> : null}
            </div>
            <div className="pt-5 text-center relative">
                <button
                    disabled={status.isLoading}
                    className="btn w-full"
                    type="button"
                    onClick={handleSendLink}
                >
                    {status.isLoading && <Spinner/>} Create room!
                </button>
            </div>
        </div>)
}
