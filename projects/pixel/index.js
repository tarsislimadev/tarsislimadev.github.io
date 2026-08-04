import { HTML, nButton, nInput } from '../libs/afrontend/index.js'

export class Page extends HTML {
  el = {
    roomIdInput: null,
  }

  onCreate() {
    super.onCreate()
    this.append(this.getCreateRoomButton())
    this.append(this.getRoomIdInput())
    this.append(this.getEnterRoomButton())
  }

  getCreateRoomButton() {
    return this.createButton('Create Room', () => {
      window.location.href = `./room.html`
    })
  }

  getRoomIdInput() {
    return this.el.roomIdInput = this.createInput('Room ID', 'roomId')
  }

  getEnterRoomButton() {
    return this.createButton('Enter Room', () => {
      const roomId = this.el.roomIdInput.getValue()
      if (roomId) {
        window.location.href = `./controls.html?roomId=${roomId}`
      } else {
        alert('Please enter a room ID.')
      }
    })
  }

  createButton(label, onClick) {
    const button = new nButton()
    button.setText(label)
    button.addEventListener('click', onClick)
    return button
  }

  createInput(placeholder, id) {
    const input = new nInput()
    input.setAttr('type', 'text')
    input.setAttr('placeholder', placeholder)
    input.setAttr('id', id)
    return input
  }
}
