
import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons'



import styles from './PhotoViewer.scss';

// similar to JQuery lightbox
class PhotoViewer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeImg: null, 
    };

    this.viewerRef = React.createRef();
  }

  // used to check for initial open (via change in 'isVisible') to set 'activeImg'
  componentDidUpdate(prevProps) {
    
    // NOT WORKING
    /*if(this.props.album && !prevProps.album) {
      console.log('setActiveImg');
      this.setState({
        activeImg: this.props.album.pictures[0], // set activeImg
      })
    }*/
  }

  // close the PhotoViewer
  hidePhotoViewer = (se) => {
    if(se.target === this.viewerRef.current) {
      this.props.close();
    }
  }

  // set new activeImg when thumbnail is clicked
  setActiveImage = (id) => {
    console.log('setActiveImage --> ', id);
    this.setState({
      activeImg: this.props.album.pictures.filter(pic => pic._id === id)[0],
    })
  }

  // used to style the currently selected image in the thumbnail strip
  isSelected = (id) => {
    return this.state.activeImg && this.state.activeImg._id === id;
  }

  // change activeImg to the next arr elem
  next = () => {
    const { pictures } = this.props.album;
    const currentIdx = pictures.indexOf(this.state.activeImg);

    if(currentIdx + 1 >= pictures.length) {
      return;
    } 

    this.setState({
      activeImg: pictures[currentIdx + 1],
    })
  }

  // change activeImg to the previous arr elem
  previous = () => {
    const { pictures } = this.props.album;
    const currentIdx = pictures.indexOf(this.state.activeImg);

    if(currentIdx - 1 < 0) {
      return;
    } 

    this.setState({
      activeImg: pictures[currentIdx - 1],
    })
  }

  // used to change activeImg while scrolling over content area 
  handleScroll = (e) => {
    if(e.deltaY > 0) {
      this.next();
    } else {
      this.previous();
    }

    e.preventDefault();
  }


  render() {
    const { activeImg } = this.state;
    const { album } = this.props;

    //console.log('photoViewer state --> ', this.state);
    //console.log('photoViewer props --> ', this.props);

    if(!this.props.isVisible || !this.props.album) return null;

    const imgWidth = '400';
    const imgHeight = '400';

    const img = activeImg ? activeImg.path : album.profile.image.path;

    return (
      <div className={styles.fullscreen} ref={this.viewerRef} onClick={this.hidePhotoViewer}>
        
        <div className={styles.content}>
          <div className={styles.titleStrip}>
            <div>{album.name}</div>
            <div>Created by: {album.author.name}</div>
            <div className='exit'></div>
          </div>

          <div className={styles.activeImg} onWheel={(e) => this.handleScroll(e)}>
            <div className={styles.navBtn}>
              <FontAwesomeIcon icon={faArrowAltCircleLeft} color={'grey'} size={'3x'} 
                onClick={this.previous} />
            </div>
            <div className='img'>
              <img src={img} width={imgWidth} height={imgHeight} />
            </div>
            <div className={styles.navBtn}>
              <FontAwesomeIcon icon={faArrowAltCircleRight} color={'grey'} size={'3x'} 
                onClick={this.next} />
            </div>
          </div>

          <div className={styles.photoStrip}>
            { album.pictures.map((pic) => {
              const isSelected = this.isSelected(pic._id);
              return (
                <img src={pic.path} width='100' height='100' className={isSelected ? styles.selectedThumbnail : ''} 
                  onClick={() => this.setActiveImage(pic._id)} />
              )
            })}
          </div>
        </div>
        
      </div>
    )
  }
}

PhotoViewer.propTypes = {
  album: PropTypes.shape({
    name: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired, 
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),

  close: PropTypes.func.isRequired, 
  isVisible: PropTypes.bool.isRequired,
}

export default PhotoViewer;
