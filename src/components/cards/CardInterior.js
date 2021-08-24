import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles((theme) => ({
  card: {
    width: 345,
    margin: 24,
    cursor: 'pointer'
  },
  media: {
    height: 140,
  },
  tag: {
    textTransform: 'capitalize',
    marginRight: 8,
    marginTop: 6
  },
  description: {
    paddingTop: 8
  },
  favorite: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 8
  },
  buttonOutline: {
    border: `1px solid black`,
    height: 30,
    width: 30,
  }
}))

const CardInterior = ({ entity, setFavoriteHome, openHomeModal }) => {
  const classes = useStyles()

  return (
    <React.Fragment>
      <Typography variant="h5" color="textPrimary" component="p" style={{ fontSize: 18 }}>
        {entity.name || entity.address}
      </Typography>
      {
        entity.homePlanId &&
        <Typography variant="body1" color="textSecondary" component="p">
        {entity.numBeds} beds - {entity.numBaths} baths - {entity.sqft} sqft
        </Typography>
      }
      {
        entity.lotId &&
        <Typography variant="body1" color="textSecondary" component="p">
        {entity.acres} acres
        </Typography>
      }

      {entity.tags?.map(tag => <Chip label={tag} key={`entityTags${tag}`} className={classes.tag}/>)}
      <Typography variant="body1" color="textPrimary" component="p" className={classes.description}>
        {entity.description}
      </Typography>
    </React.Fragment>
  )
}

export default CardInterior;
