
import Chat from './chat.model';


export const searchChats = (req, res) => {
  Chat.find()
    .then(chats => res.status(200).json({ chats }))
    .catch(err => handleError(res, err))
}

export const getChat = (req, res) => {  
  Chat.findById(req.params.id)
    .then(chat => res.status(200).json({ chat }))
    .catch(err => handleError(res, err))
}

export const createChat = (req, res) => {
  console.log('createChat body --> ', req.body);
  Chat.create(req.body)
    .then(chat => res.status(201).json({ chat }))
    .catch(err => handleError(res, err))
}

function handleError(res, err) {
  return res.status(500).json({ err });
}
