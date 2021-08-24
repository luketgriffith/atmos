import React, { useEffect, useState } from 'react'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	Typography,
  CardContent,
  IconButton
} from '@material-ui/core'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { CardInterior, MainCard } from '../'
import { setIsFavorite } from '../../actions';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles'

const SelectedDialog = ({ isShown, setIsShown, entity, matches }) => {
	const classes = useStyles()
  const dispatch = useDispatch()

  const setFavorite = (e) => {
    e.stopPropagation();
    dispatch(setIsFavorite(entity));
  }

	return (
		<Dialog
			open={isShown}
      maxWidth="md"
			className={classes.dialog}
			onClose={() => {
				setIsShown(false)
			}}
			PaperProps={{
				style: {
					padding: 0
				}
			}}>
	     <DialogContent>
        <div className={classes.top}>
          <img src={entity.image} className={classes.image}/>
          <CardContent>
            <CardInterior entity={entity}/>
          </CardContent>
          <IconButton className={classes.buttonOutline} onClick={setFavorite}>
            <FavoriteBorderIcon style={{ fill: entity.favorite ? 'pink' : 'black', fontSize: 18 }}/>
          </IconButton>
        </div>
        <div className={classes.bottom}>
          <div className={classes.center}>
            <Typography variant="h5" color="textSecondary" component="p">
              {entity.homePlanId ? 'Compatible Lots' : 'Compatible Homes'}
            </Typography>
          </div>
          <div className={classes.row}>
            {matches.map(entity => <MainCard entity={entity} small={true} key={`match${entity.homePlanId || entity.lotId}`}/> )}
          </div>
        </div>
			 </DialogContent>

		</Dialog>
	)
}

const useStyles = makeStyles((theme) => ({
  top: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative'
  },
  bottom: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 24
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    'overflow-x': 'scroll'
  },
  image: {
    width: '50%'
  },
  favorite: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 8
  },
  buttonOutline: {
    position: 'absolute',
    top: 16,
    right: 16,
    border: `1px solid black`,
    height: 30,
    width: 30,
  }
}))

export default SelectedDialog
