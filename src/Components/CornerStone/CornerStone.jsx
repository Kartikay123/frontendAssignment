import React, { useEffect } from "react";
import { RenderingEngine, Enums } from "@cornerstonejs/core";

const { ViewportType } = Enums;

const CornerstoneElement = ({ id }) => {
  useEffect(() => {
    const run = async () => {
      const imageIds = [`dicomweb://localhost:8080/view/${id}`];

      const element = document.createElement("div");
      element.id = "cornerstone-element";
      element.style.width = "500px";
      element.style.height = "450px";
      element.style.position = "absolute"; 
      element.style.top = "130px"; 
      element.style.right = "250px";
      element.style.backgroundColor = "black"; 
      document.getElementById("content").appendChild(element);

      const renderingEngineId = "myRenderingEngine";
      const renderingEngine = new RenderingEngine(renderingEngineId);
      console.log(renderingEngine);
      const viewportId = "DX_STACK";
      const viewportInput = {
        viewportId,
        type: ViewportType.STACK,
        element,
        defaultOptions: {
          background: [0.2, 0, 0.2],
        },
      };

      renderingEngine.enableElement(viewportInput);

      const viewport = renderingEngine.getViewport(viewportId);
      console.log(viewport);
      const stack = [imageIds[0]];

      await viewport.setStack(stack);

      viewport.render();
    };

    run();
  }, []);

  return (
    <>
      <div id="content"></div>
    </>
  );
};

export default CornerstoneElement;
