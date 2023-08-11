import styles from "../styles/detailStyle.module.css"
import ButtonIconCustom from "./ButtonIconCustom";
import { Button, Col, Container, Form, Modal, Row, Table } from "react-bootstrap"
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { API_URI } from "../common/constants";
import ButtonCustomRedGreen from "./ButtonCustomRedGreen";

function CrudDetail() {

    const { id } = useParams();

    const [notas, setNotas] = useState([])
    const [changeNota, setChangeNota] = useState([])

    const [showModal, setShowModal] = useState(false);
    const [currentMateria, setCurrentMateria] = useState("");

    const getNotas = async () => {
        try {
            const response = await fetch(API_URI + "/materias/show/" + id);
            if (!response.ok) throw new Error("No se pudieron obtener las notas");
            const result = await response.json();
            console.log("Notas recibidas:", result);

            // Filtrar propiedades no deseadas (_id y v) antes de establecer el estado
            const filteredNotas = Object.entries(result).reduce(
                (filtered, [key, value]) => {
                    if (key !== "_id" && key !== "__v") {
                        filtered[key] = value;
                    }
                    return filtered;
                },
                {}
            );
            if (Object.keys(filteredNotas).length > 0) {
                setNotas(filteredNotas);
            } else {
                console.log("No hay notas disponibles.");
            }
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    const updateNotas = async () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                nota: changeNota,
            });

            const requestOptions = {
                method: "PUT",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            };

            const response = await fetch(
                API_URI +
                "/materias/update/" + id + "/" +
                currentMateria,
                requestOptions
            );
            const result = await response.json();
            console.log(result);
            // Refrescar las notas después de la actualización
            getNotas();
            setShowModal(false);
        } catch (error) {
            console.error(error);
            alert("Error al actualizar la nota.");
        }
    }
    const handleUpdateNota = async () => {
        await updateNotas()
    }

    useEffect(() => {
        getNotas()
    }, [])


    return (
        <>
            <Container>
                <Row className={`align-items-center flex-column ${styles['custom-container']}`}>
                    <Col className="d-flex justify-content-center">
                        <h2>Detalle Notas Finales</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {Object.keys(notas).length > 0 ? (
                            <>
                                <Table className={styles["custom-table"]} striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Materia</th>
                                            <th>Nota Final</th>
                                            <th>Actualizar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.entries(notas).map(([materiaNombre, nota]) => (
                                            <tr key={materiaNombre}>
                                                <td>{materiaNombre}</td>
                                                <td>{nota}</td>
                                                <td>
                                                    <ButtonIconCustom
                                                        variant="outline-success"
                                                        icon="bi bi-pencil-square"
                                                        tooltip="Actualizar"
                                                        onClick={() => {
                                                            setCurrentMateria(materiaNombre);
                                                            setShowModal(true);
                                                        }}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                {/* Modal para actualizar notas */}
                                <Modal show={showModal} onHide={() => setShowModal(false)}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Actualizar Nota</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form>
                                            <Form.Group controlId="formNota">
                                                <Form.Label>Nueva Nota</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    placeholder="Ingrese la nueva nota"
                                                    value={changeNota}
                                                    onChange={(e) => setChangeNota(e.target.value)}
                                                />
                                            </Form.Group>
                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <ButtonCustomRedGreen
                                            color="red"
                                            onClick={() => setShowModal(false)}
                                            nameBtt="Cancelar"
                                        />
                                        <ButtonCustomRedGreen
                                            color="green"
                                            onClick={handleUpdateNota}
                                            nameBtt="Actualizar"
                                            disabled={!changeNota}
                                        />
                                    </Modal.Footer>
                                </Modal>
                            </>
                        ) : (
                            <p>No hay notas disponibles.</p>
                        )}
                    </Col>
                </Row>
                {/* <h2>Detalle Notas Finales</h2> */}

            </Container>
        </>
    )
}

export default CrudDetail