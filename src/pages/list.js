import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import {
	Button
} from '@material-ui/core'
import { MainCard, Dialog } from '../components';
import {
  useLocation,
  useHistory
} from "react-router-dom";

function useQuery(type) {
  return new URLSearchParams(useLocation().search);
}

const List = ({ type }) => {
	const classes = useStyles();
  const query = useQuery();
  const history = useHistory();
  const homes = useSelector((state) => state.homes);
  const lots = useSelector((state) => state.lots);
  const combinations = useSelector((state) => state.combinations);
  const [open, toggleModal] = useState(false);
  const [selected, setSelected] = useState({});
  const [matches, setMatches] = useState([]);
  const [showSaved, setShowSaved] = useState(false);

  // check query params to see if we need to open the modal
  useEffect(() => {
    let param = query.get(type === 'homes' ? 'selectedHomePlan' : 'selectedLot')

    if (param && type === 'homes') {
      let selected = homes.find(h => h.homePlanId.toString() === param)
      if (selected) openModal(selected)
    } else if (param) {
      let selected = lots.find(h => h.lotId.toString() === param)
      if (selected) openModal(selected)
    }
  }, [query])

  // if the selected entity or other data changes, update the matches
  useEffect(() => {
    if (selected) {
      const ourMatches = combinations.filter(c => {
        if (selected.homePlanId) return c.homePlanId === selected.homePlanId
        return c.lotId === selected.lotId
      }).map(match => {
        if (selected.homePlanId) return lots.find(l => l.lotId === match.lotId)
        return homes.find(h => h.homePlanId === match.homePlanId)
      })
      setMatches(ourMatches)
    }
  }, [selected, lots, homes])

  const openModal = (entity) => {
    setSelected(entity);
    toggleModal(true);
  }

  const closeModal = () => {
    history.push(type === 'homes' ? '/homes' : 'lots')
    setSelected({});
    toggleModal(false)
  }

  const relevantList = type === 'homes' ? homes : lots;
  const list = relevantList.filter(entity => {
    if (!showSaved) return true;
    return entity.favorite;
  })

	return (
		<div className={classes.root}>
      <div className={classes.row}>
        <Button variant="outlined" onClick={() => setShowSaved(!showSaved)}>Show {showSaved ? 'All' : 'Saved'} {type === 'homes' ? 'Homes' : 'Lots'}</Button>
      </div>
      {list && list.length ? list.map(entity => (
          <MainCard
            entity={entity}
            key={`${entity.homePlanId || entity.lotId}`}
            openModal={openModal}
            />
          )
        ) : <div style={{ paddingTop: 24 }}>{showSaved ? `No saved ${type}` : `No ${type} found` }</div>}
      <Dialog
        entity={selected}
        isShown={open}
        setIsShown={closeModal}
        matches={matches}
      />
		</div>
	)
}

const useStyles = makeStyles((theme) => ({
  row: {
    width: '100%'
  },
	root: {
		flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    padding: 48
	}
}))

export default List
