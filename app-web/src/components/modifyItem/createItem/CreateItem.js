import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Form, Button, Row, Col, FormLabel } from "react-bootstrap";
import {
  useMenuStore,
  useOptionStore,
  useIngredientStore,
} from "../../../store/menuReducer";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
const CreateItem = () => {
  const queryClient = useQueryClient();
  const allOptions = useOptionStore((state) => state.options);
  const allIngredients = useIngredientStore((state) => state.ingredients);
  const menu = useMenuStore((state) => state.menu);
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [options, setOptions] = useState(new Map());
  const [ingredients, setIngredients] = useState(new Set());
  const [ingredientTypeIndex, setIngredientTypeIndex] = useState(0);
  const [ingredientsList, setIngredientsList] = useState([]);
  const handleItemNameChange = (event) => setItemName(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);
  const handleImageUrlChange = (event) => setImageUrl(event.target.value);
  const handleCategoryChange = (event) => setCategoryId(event.target.value);

  const handleOptionChange = (event, optionId) => {
    // const optionIndex = options.indexOf(event.target.value);
    console.log(optionId);
    console.log(event.target.value);
    console.log(event.target.checked);
    const tmpOptions = new Map(options);
    if (event.target.checked) {
      tmpOptions.set(optionId, 0);
    } else {
      tmpOptions.delete(optionId);
    }
    console.log(tmpOptions);
    setOptions(tmpOptions);
  };

  const handlePriceChange = (event, optionId) => {
    const tmpOptions = new Map(options);
    const price = event.target.value;
    tmpOptions.set(optionId, price * 100);
    setOptions(tmpOptions);
  };

  const handleIngredientTypeChange = (event, ingredientTypeId) =>
    setIngredientTypeIndex(
      allIngredients.findIndex(
        (ingredientType) => ingredientType.id === ingredientTypeId
      )
    );
  const handleIngredientSelect = (event) => {
    console.log(event);
    const tmpIngredients = new Set();
    for (let ingredient of event) {
      tmpIngredients.add(ingredient.value);
    }
    setIngredients(tmpIngredients);
  };
  const handleIngredientChange = (event, ingredientId) => {
    const tmpIngredients = new Set(ingredients);
    if (event.target.checked) {
      tmpIngredients.add(ingredientId);
    } else {
      tmpIngredients.delete(ingredientId);
    }
    console.log(tmpIngredients);
    setIngredients(tmpIngredients);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createItemMutation();
    // Handle form submission
  };

  useEffect(() => {
    let tmpIngredients = [];
    for (let ingredients of allIngredients) {
      for (let ingredient of ingredients.ingredients) {
        tmpIngredients.push({
          label: ingredient.ingredientName,
          value: ingredient.id,
        });
      }
    }
    console.log(tmpIngredients);
    setIngredientsList(tmpIngredients);
  }, [allIngredients, setIngredientsList]);
  
  const createItem = async () => {
    console.log("creating item");
    const item = {};
    item.itemName = itemName;
    item.description = description;
    item.imageUrl = imageUrl;
    item.categoryId = categoryId;
    item.options = Object.fromEntries(options);
    item.ingredients = [...ingredients];
    await axios.post("/api/item/modify-item", item).then((res) => {
      console.log("in then", res.data);
      if (res.status === 200) {
        console.log("create item success");
        console.log(res.data);
        return res.data;
      }
    });
  };

  const {
    isSuccess: postSuccess,
    isLoading: postLoading,
    isError: postIsError,
    mutate: createItemMutation,
  } = useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["WholeMenu"] });
    },
  });

  if (!menu || allOptions.length === 0 || allIngredients.length === 0) {
    return <p>Loading....</p>;
  }
  console.log("options", allOptions);
  console.log("ingredients", allIngredients);
  if (postLoading) {
    return <h1>Creating item...</h1>;
  }
  if (postIsError) {
    return <h1>There is a error.</h1>;
  }
  if (postSuccess) {
    return <h1>You have successfully create a item</h1>;
  }
  return (
    <Form onSubmit={handleSubmit}>
      <h1>Create Item</h1>
      <hr />
      <Form.Group controlId="formCategory">
        <Form.Label>Category</Form.Label>
        <div>
          {menu.map((category) => {
            return (
              <Form.Check
                inline
                type="radio"
                label={category.categoryName}
                name="category"
                value={category.id}
                key={category.id}
                onChange={handleCategoryChange}
              />
            );
          })}
        </div>
      </Form.Group>

      <Form.Group controlId="formItemName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter item name"
          name="itemName"
          onChange={handleItemNameChange}
        />
      </Form.Group>
      <Form.Group controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          onChange={handleDescriptionChange}
        />
      </Form.Group>
      <Form.Group controlId="formImageUrl">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter image URL"
          name="imageUrl"
          onChange={handleImageUrlChange}
        />
      </Form.Group>
      <FormLabel>Options</FormLabel>
      {allOptions.map((option) => (
        <div key={option.id} className="d-flex align-items-center">
          <Form.Group className="me-3 my-2">
            <Form.Check
              type="checkbox"
              label={option.optionName}
              name={option.optionName}
              onChange={(e) => handleOptionChange(e, option.id)}
            />
          </Form.Group>
          {options.has(option.id) && (
            <Form.Group controlId={`formPrice_${option.optionName}`}>
              <Form.Control
                type="number"
                placeholder="Enter price"
                name={`price_${option.name}`}
                //   value={values[`price_${option.name}`]}
                onChange={(e) => handlePriceChange(e, option.id)}
                disabled={!options.has(option.id)}
              />
            </Form.Group>
          )}
        </div>
      ))}
      <FormLabel>Ingredients</FormLabel>
      <Row>
        <Select
          options={ingredientsList}
          value={ingredientsList.filter((ingredient) =>
            ingredients.has(ingredient.value)
          )}
          onChange={handleIngredientSelect}
          isMulti
          placeholder="Select ingredients"
          isSearchable={true}
        />
      </Row>
      <Row className="my-2">
        {allIngredients.map((ingredientType) => (
          <Col sm={3} md={2} key={ingredientType.id}>
            <Button
              variant="outline-primary"
              onClick={(e) => handleIngredientTypeChange(e, ingredientType.id)}
            >
              {ingredientType.ingredientTypeName}
            </Button>
          </Col>
        ))}
      </Row>
      <Row className="my-2">
        {allIngredients[ingredientTypeIndex].ingredients.map((ingredient) => (
          <Col sm={3} md={2} key={ingredient.id}>
            <Form.Group>
              <Form.Check
                type="checkbox"
                label={ingredient.ingredientName}
                name={ingredient.ingredientName}
                checked={ingredients.has(ingredient.id)}
                onChange={(e) => handleIngredientChange(e, ingredient.id)}
              />
            </Form.Group>
          </Col>
        ))}
      </Row>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Create item
      </Button>
    </Form>
  );
};

export default CreateItem;
