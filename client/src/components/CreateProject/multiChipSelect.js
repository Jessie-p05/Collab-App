import React from "react";
import { withStyles } from '@material-ui/core/styles'
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import  MenuItem from "@material-ui/core/MenuItem";
import Downshift from "downshift";
import Chip from "@material-ui/core/Chip";
import CancelIcon from "@material-ui/icons/Cancel";

const styles = {
  chipContainer: {
    alignItems: "center",
    backgroundColor: "transparent",
    display: "inline-block",
    marginBottom: 10
  },
  chip: {
    marginTop: 10,
    marginRight: 5
  },
  paper: {
    maxHeight: "150px",
    overflowY: "auto",
  }
};

const renderInput = inputProps => {
  const { InputProps,  availableItems } = inputProps;

  const allItemSelected = availableItems.length === 0;

  return (
    <TextField
      fullWidth
      label={
        allItemSelected ? "No more skill to add" : "Choose a skill"
      }
      disabled={allItemSelected}
      InputProps={{
        classes: {
          input: styles.input
        },
        ...InputProps
      }}
    />
  );
};

const renderChipList = inputProps => {
  const {  selectedItem, onRemoveItem } = inputProps;
  return (
    <div className={styles.chipContainer}>
      {selectedItem.length > 0 &&
        selectedItem.map(item => (
          <Chip
            key={item}
            className={styles.chip}
            label={item}
            deleteIcon={<CancelIcon />}
            onDelete={() => onRemoveItem(item)}
            onClick={() => onRemoveItem(item)}
          />
        ))}
    </div>
  );
};

const renderSuggestion = params => {
  const { item, index, itemProps, highlightedIndex, selectedItem } = params;
  const isHighlighted = highlightedIndex === index;
  const isSelected = selectedItem.indexOf(item.name) > -1;

  return (
    !isSelected && (
      <MenuItem
        {...itemProps}
        key={item.id}
        selected={isHighlighted}
        component="div"
      >
        {item.name}
      </MenuItem>
    )
  );
};

const getSuggestions = (inputValue, itemList) =>
  itemList.filter(item =>
    item.name.includes(inputValue)
  );

  function MultiChipSelect(props) {
  const { classes, availableItems, onRemoveItem, ...rest } = props;
  return (
    <Downshift {...rest}>
      {({
        getInputProps,
        getItemProps,
        inputValue,
        selectedItem,
        highlightedIndex,
        toggleMenu,
        isOpen
      }) => (
        <div>
          {renderChipList({
            classes,
            onRemoveItem,
            selectedItem
          })}

          {renderInput({
            classes,
            selectedItem,
            availableItems,
            InputProps: {
              ...getInputProps({
                onClick: () => toggleMenu()
              })
            }
          })}

          {isOpen && (
            <Paper className={classes.paper} square>
              {getSuggestions(inputValue, availableItems).map((item, index) =>
                renderSuggestion({
                  item,
                  index,
                  itemProps: getItemProps({
                    item: item.name
                  }),
                  highlightedIndex,
                  selectedItem
                })
              )}
            </Paper>
          )}
        </div>
      )}
    </Downshift>
  );
}

export default withStyles(styles)(MultiChipSelect);
