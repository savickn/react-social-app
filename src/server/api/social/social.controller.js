import Social from './social.model';
import sanitizeHtml from 'sanitize-html';

export function getSocials(req, res) {
  Social.find({}, function(err, socials) {
    if(err) return res.status(500).send(err);
    return res.status(200).json(socials);
  })
}

export function getSocial(req, res) {
  Social.findOne({cuid: req.params.cuid}, function(err, social) {
    if(err) return res.status(500).send(err);
    return res.status(200).json(social);
  })
}

export function addSocial(req, res) {
  Social.create(req.body, function(err, social) {
    if(err) return res.send(err);
    return res.status(201).json(social);
  })
}

export function cancelSocial(req, res) {

}
