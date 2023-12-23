import copyImg from '../../assets/images/copy.svg';

import { RoomCodeStyle } from './styles';

type RoomCodeProps = {
    code: string
}

export function RoomCode(props: RoomCodeProps) {

    function copyRoomCodeToClipboard() {
        navigator.clipboard.writeText(props.code)
    }

    return(
        <RoomCodeStyle onClick={copyRoomCodeToClipboard}>
            <div>
                <img src={copyImg} alt="Copy room code" />
            </div>
            <span>Sala #{ props.code }</span>
        </RoomCodeStyle>
    )
}