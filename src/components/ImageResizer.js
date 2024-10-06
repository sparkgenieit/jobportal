import "./ImageResizer.css"

import { useEffect, useRef, useState } from "react";

export default function Input({ width, height, setImg, imgSrc }) {
    const [croppedWidth, setCroppedWidth] = useState(0)
    const [croppedHeight, setCroppedHeight] = useState(0)
    const imgRef = useRef(null);
    const [originalImageUrl, setOriginalImageUrl] = useState(null)

    useEffect(() => {
        fetch(imgSrc)
            .then(response => response.blob())
            .then(blob => {
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onload = function (e) {

                    let image_url = e.target.result

                    const img = new Image();

                    img.src = image_url;

                    img.onload = function () {
                        const canvas = document.createElement("canvas");
                        const ctx = canvas.getContext("2d");

                        canvas.width = width
                        canvas.height = height

                        // Actual resizing
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                        const dataurl = canvas.toDataURL("image/jpeg");
                        setOriginalImageUrl(dataurl);
                        imgRef.current.src = dataurl
                        canvas.remove()
                    }
                }
            })
    }, [imgSrc])


    const handleHeightSlider = (e) => {

        const value = e.target.value

        let newHeight = (height * (value / 100))

        const img = new Image();

        img.src = originalImageUrl;

        img.onload = function () {

            const canvas = document.createElement("canvas")

            const ctx = canvas.getContext("2d")

            canvas.width = width
            canvas.height = height

            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.drawImage(img, croppedWidth, newHeight, width - (croppedWidth * 2), height - (newHeight * 2), 0, 0, width, height)

            const imageUrl = canvas.toDataURL("image/jpeg")

            imgRef.current.src = imageUrl

            setCroppedHeight(newHeight)

            canvas.toBlob((blob) => {
                setImg(blob)
            }, 'image/jpeg')

            canvas.remove()
        }

    }

    const handleWidthSliders = (e) => {

        const value = e.target.value

        let newWidth = (width * (value / 100))

        const img = new Image();

        img.src = originalImageUrl;

        img.onload = function () {

            const canvas = document.createElement("canvas")

            const ctx = canvas.getContext("2d")

            canvas.width = width
            canvas.height = height


            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.drawImage(img, newWidth, croppedHeight, width - (newWidth * 2), height - (croppedHeight * 2), 0, 0, width, height)

            const imageUrl = canvas.toDataURL("image/jpeg")

            canvas.toBlob((blob) => {
                setImg(blob)
            }, 'image/jpeg')


            imgRef.current.src = imageUrl

            setCroppedWidth(newWidth)

            canvas.remove()
        }
    }


    return (
        <div>
            <div className="d-flex gap-4 align-items-center">
                <div
                    style={{
                        width: `${width}px`,
                        height: `${height}px`,
                        overflow: "hidden",
                    }}
                    className="rounded border"
                >
                    <img className="rounded img-resize" ref={imgRef} />
                </div>
                <div style={{ width: "10px" }}>
                    <input
                        type="range"
                        name="height"
                        onChange={(e) => { handleHeightSlider(e) }}
                        defaultValue={0}
                        min={-25}
                        max={25}
                        className="height-slider"
                        style={{ height: `${height}px` }}
                    />
                </div>
            </div>
            <input
                type="range"
                name="width"
                className="slider width-slider"
                onChange={(e) => handleWidthSliders(e)}
                defaultValue={0}
                min={-25}
                max={25}
                style={{ width: `${width}px` }}
            />
        </div>
    );
}
