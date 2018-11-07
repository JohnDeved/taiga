import P2P from 'socket.io-p2p'
import io from 'socket.io-client'

interface Ip2p extends P2P {
  peerId: string
}

const peerInit = () => {
  console.log('peer to peer ready', p2p.peerId)
  p2p.emit('peer-msg', {
    message: `${p2p.peerId} ist beigetreten`,
    id: p2p.peerId
  })
}

const socket = io(process.env.NODE_ENV !== 'production' ? 'localhost:3000' : '')
const p2p = new P2P(socket, {}, peerInit) as Ip2p

p2p.on('peer-msg', data => {
  console.log(data)
})

export default p2p 