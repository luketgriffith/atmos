import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardMedia,
  CardContent,
  Chip,
  IconButton,
  Typography
} from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { CardInterior } from '../';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIsFavorite } from '../../actions';

const MainCard = ({ entity, openModal }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  const setFavorite = (e) => {
    e.stopPropagation();
    dispatch(setIsFavorite(entity));
  }

  const select = () => {
    const params = entity.homePlanId ? `/homes?selectedHomePlan=${entity.homePlanId}` :  `/lots?selectedLot=${entity.lotId}`
    return history.push(params)
  }

  return (
    <Card className={classes.card} onClick={select}>
      <CardMedia
        className={classes.media}
        image={entity.image}
      >
        <div className={classes.favorite}>
          <IconButton className={classes.buttonOutline} onClick={setFavorite}>
            <FavoriteBorderIcon style={{ fill: entity.favorite ? 'pink' : 'black', fontSize: 18 }}/>
          </IconButton>
        </div>
      </CardMedia>
      <CardContent>
        <CardInterior entity={entity}/>
      </CardContent>
    </Card>
  )
}

const useStyles = makeStyles((theme) => ({
  card: {
    width: 345,
    minWidth: 345,
    margin: 24,
    marginLeft: 0,
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

export default MainCard;
