import React from "react";

const AttachmentPreview = ({fileUrl}) => {
    if (!fileUrl) {
        return <p>No attachment available</p>;
    }

    // Extract file extension
    const getFileType = (url) => {
        const ext = url.split(".").pop().toLowerCase();
        if (["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(ext)) return "image";
        if (["mp4", "webm", "ogg"].includes(ext)) return "video";
        if (["pdf"].includes(ext)) return "pdf";
        return "unsupported";
    };

    const fileType = getFileType(fileUrl);

    // Handle file download
    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = fileUrl.split("/").pop(); // Use the file name from the URL
        window.open(fileUrl, "_blank");
    };

    return (
        <div style={styles.container}>
            {/* File Preview */}
            <div style={styles.preview}>
                {fileType === "image" ? (
                    <img src={fileUrl} alt="Attachment" style={styles.image}/>
                ) : fileType === "video" ? (
                    <video controls style={styles.video}>
                        <source src={fileUrl} type="video/mp4"/>
                        Your browser does not support the video tag.
                    </video>
                ) : fileType === "pdf" ? (
                    <embed src={fileUrl} type="application/pdf" style={styles.pdf}/>
                ) : (
                    <div style={styles.placeholder}>
                        <p style={styles.placeholderText}>Unsupported File</p>
                    </div>
                )}
            </div>

            {/* File Info and Actions */}
            <div style={styles.info}>
                <p style={styles.fileName}>{fileUrl.split("/").pop()}</p>
                <button onClick={handleDownload} style={styles.downloadButton}>
                    Download
                </button>
            </div>
        </div>
    );
};

// Inline CSS styles
const styles = {
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        border: "1px solid #ccc",
        borderRadius: "8px",
        margin: "10px",
        padding: "10px",
        maxWidth: "350px",
        textAlign: "center",
    },
    preview: {
        width: "100%",
        marginBottom: "3px",
        marginRight: "5px",
    },
    image: {
        width: "100%",
        height: "auto",
        borderRadius: "5px",
    },
    video: {
        width: "100%",
        height: "auto",
        borderRadius: "5px",
    },
    pdf: {
        width: "100%",
        height: "270px",
    },
    placeholder: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "150px",
        backgroundColor: "#f0f0f0",
        borderRadius: "5px",
    },
    placeholderText: {
        color: "#666",
        fontSize: "10px",
    },
    info: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        marginLeft: "5px",
    },
    fileName: {
        fontSize: "12px",
        fontWeight: "bold",
        margin: "0",
    },
    downloadButton: {
        backgroundColor: "#b0df66",
        color: "#200ea2",
        fontSize: "14px",
        fontWeight: "bolder",
        border: "none",
        borderRadius: "5px",
        padding: "5px 10px",
        cursor: "pointer",
    },
};

export default AttachmentPreview;
