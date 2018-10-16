export const notFound = (req, res) => {
    let url = `${req.protocol}://${req.get('host')}${req.originaUrl}`;
    return res.status(404).send({
        error: {
            message: 'Error no se ha encontrado la url destino',
            url
        }
    })
};
