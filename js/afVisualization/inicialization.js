var cy = cytoscape({

    container: document.getElementById('cy'),// container to render in

    zoom: 1.5,
    // wheelSensitivity: 0.2,
  
    style: [ // the stylesheet for the graph
      {
        selector: 'node',
        style: {
          'background-color': '#666',
          'label': 'data(id)'
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