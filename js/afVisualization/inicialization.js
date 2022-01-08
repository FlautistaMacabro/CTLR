var cy = cytoscape({

    container: document.getElementById('cy'),// container to render in

    zoom: 1.6,
    // wheelSensitivity: 0.2,
  
    style: [ // the stylesheet for the graph
      {
        selector: 'node',
        style: {
          'background-color': 'rgba(207, 103, 221, 0.49)',
          'color': 'floralwhite',
          'label': 'data(id)',
          'border-style': 'double',
          'border-color': 'floralwhite',
          'background-width': '60%',
          'background-height': '70%',
          // Importa para verificações de edição
          'background-image': 'none',
          'border-width': '0px',
          'font-size': '18px'
          //
        }
      },
  
      {
        selector: 'edge',
        style: {
          'width': 3,
          'line-color': 'rgba(193, 85, 255, 0.589)',
          'target-arrow-color': 'rgba(190, 65, 221, 0.6)',
          'target-arrow-shape': 'triangle',
          'curve-style': 'bezier',
          'label': 'data(label)',
          'font-size': '16px',
          'color': 'floralwhite'
        }
      }
    ],
  
    layout: {
      name: 'grid',
      rows: 1
    }
  
  });