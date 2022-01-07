var cy = cytoscape({

    container: document.getElementById('cy'),// container to render in

    zoom: 1.5,
    // wheelSensitivity: 0.2,
  
    style: [ // the stylesheet for the graph
      {
        selector: 'node',
        style: {
          'background-color': '#666',
          'label': 'data(id)',
          'border-style': 'double',
          'border-color': 'black',
          'background-width': '60%',
          'background-height': '70%',
          // Importa para verificações de edição
          'background-image': 'none',
          'border-width': '0px'
          //
        }
      },
  
      {
        selector: 'edge',
        style: {
          'width': 3,
          'line-color': '#ccc',
          'target-arrow-color': '#ccc',
          'target-arrow-shape': 'triangle',
          'curve-style': 'bezier',
          'label': 'data(label)',
          'font-size': '20px',
          'color': '#777'
        }
      }
    ],
  
    layout: {
      name: 'grid',
      rows: 1
    }
  
  });