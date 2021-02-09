import React, { useState, useEffect } from 'react';
import {
  Container,
  Page,
  Button,
  Box,
  Row,
  Col,
  Card,
  FormField,
  Input,
  Dropdown,
  Checkbox,
  InputArea,
  Text,
  DropdownLayoutValueOption,
} from 'wix-style-react';

const colorOptions = [
  {
    id: 1,
    value: 'Red',
  },
  {
    id: 2,
    value: 'Blue',
  },
  {
    id: 3,
    value: 'Green',
  },
  {
    id: 4,
    value: 'Yellow',
  },
  {
    id: 5,
    value: 'Pink',
  },
];

const initialColorState: DropdownLayoutValueOption = { value: '', id: 0 };

export const App = () => {
  const [name, setName] = useState('');
  const [color, setColor] = useState(initialColorState);
  const [termsOfUse, setTermsOfUse] = useState(false);
  const [funFact, setFunFact] = useState('');
  const [formEnabled, setFormEnabled] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    color: '',
    funFact: '',
  });

  const clearForm = () => {
    setName('');
    setColor(initialColorState);
    setTermsOfUse(false);
    setFunFact('');
  };

  const handleSubmit = () => {
    setFormSubmitted(true);
    setFormData({
      name,
      color: color.value as string,
      funFact,
    });
  };

  useEffect(() => {
    setFormEnabled(!!name && termsOfUse);
  }, [name, termsOfUse]);

  return (
    <Container>
      <Page height="100vh">
        <Page.Header
          title="WSR Form"
          actionsBar={
            <Box>
              <Box marginLeft="small" marginRight="small">
                <Button priority="secondary" onClick={clearForm}>
                  Clear
                </Button>
              </Box>
              <Box>
                <Button disabled={!formEnabled} onClick={handleSubmit}>
                  Submit
                </Button>
              </Box>
            </Box>
          }
        />
        <Page.Content>
          <Container>
            <Row>
              <Col span={8}>
                <Card>
                  <Card.Header
                    title="WSR Form"
                    subtitle="Create your own page with wix-style-react"
                  />
                  <Card.Divider />
                  <Card.Content>
                    <Row>
                      <Col span={6}>
                        <FormField label="Name" required>
                          <Input
                            placeholder="Enter a name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                          />
                        </FormField>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={6}>
                        <FormField label="Favorite color">
                          <Dropdown
                            placeholder="Enter a color"
                            options={colorOptions}
                            onSelect={(value) => {
                              setColor(value);
                            }}
                            selectedId={color.id}
                          />
                        </FormField>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        <Checkbox
                          onChange={() => setTermsOfUse(!termsOfUse)}
                          checked={termsOfUse}
                        >
                          I agree for the terms of use
                        </Checkbox>
                      </Col>
                      <Col span={4}>
                        <Box flexWrap="wrap">
                          <Box marginLeft="small" marginRight="small">
                            <Button priority="secondary" onClick={clearForm}>
                              Clear
                            </Button>
                          </Box>
                          <Box>
                            <Button
                              disabled={!formEnabled}
                              onClick={handleSubmit}
                            >
                              Submit
                            </Button>
                          </Box>
                        </Box>
                      </Col>
                    </Row>
                  </Card.Content>
                </Card>
              </Col>
              <Col span={4}>
                <Row>
                  <Col>
                    <Card>
                      <Card.Header title="Extra" />
                      <Card.Divider />
                      <Card.Content>
                        <FormField label="Fun Fact">
                          <InputArea
                            rows={4}
                            placeholder="Enter something interesting"
                            onChange={(event) => setFunFact(event.target.value)}
                            value={funFact}
                          />
                        </FormField>
                      </Card.Content>
                    </Card>
                  </Col>
                </Row>
                {formSubmitted && (
                  <Row>
                    <Col>
                      <Card>
                        <Card.Header title="Submitted info" />
                        <Card.Divider />
                        <Card.Content>
                          <Row>
                            <Col span="6">
                              <Text weight="normal">Name:</Text>
                            </Col>
                            <Col span="6">
                              <Text weight="normal">{formData.name}</Text>
                            </Col>
                          </Row>
                          <Row>
                            <Col span="6">
                              <Text weight="normal">Favorite Color:</Text>
                            </Col>
                            <Col span="6">
                              <Text weight="normal">{formData.color}</Text>
                            </Col>
                          </Row>
                          <Row>
                            <Col span="6">
                              <Text weight="normal">Fun Fact:</Text>
                            </Col>
                            <Col span="6">
                              <Text weight="normal">{formData.funFact}</Text>
                            </Col>
                          </Row>
                        </Card.Content>
                      </Card>
                    </Col>
                  </Row>
                )}
              </Col>
            </Row>
          </Container>
        </Page.Content>
      </Page>
    </Container>
  );
};

export default App;
