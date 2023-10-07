import { ITopico } from '../../'
import { useTopicos } from '../../../../../EncapsulatedContext/useTopicos'
import { Topico } from '../Topico'
import './index.css'


export function ListTopicos() {

    const Topicos: ITopico[] = useTopicos();

    return (
        <ul>
            {Topicos.map(topico => <Topico key={topico.id} topico={topico} />)}
        </ul>
    )
}