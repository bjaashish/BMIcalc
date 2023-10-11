
    // Function to calculate BMI
    function calculateBMI() {
        // Get weight and height input values
        var weight = parseFloat(document.getElementById('weight').value);
        var height = parseFloat(document.getElementById('height').value) / 100; // Convert height to meters

        // Check if weight and height are valid numbers
        if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
            alert('Please enter valid weight and height.');
            return;
        }
        console.log("BMI function")
        // Calculate BMI
        var bmi = weight / (height * height);

        // Display the BMI result
        document.getElementById('bmiResult').textContent = 'Your BMI: ' + bmi.toFixed(2);

        // You can add logic here to change the bmiometer scale color based on the BMI value
        // For example:
        var bmiometerScales = document.querySelectorAll('.bmiometer-scale');
        bmiometerScales.forEach(function (scale, index) {
            if (bmi >= index + 1 && bmi < index + 2) {
                scale.classList.add('active');
            } else {
                scale.classList.remove('active');
            }
        });
        increasebmi(bmi);
    }

    // Attach the calculateBMI function to the form submit event
    document.querySelector('.calculator').addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent form submission
        calculateBMI(); // Calculate and display BMI
    });

    document.getElementById('reset').addEventListener('click',function(e){
        var arrowNeedle = document.querySelector('.arrow-wrapper');
        arrowNeedle.style.transform = 'rotate(' + 0 + 'deg)';
    })

var currentScale = 1;
var speed = 0;
function increasebmi(bmi) {
    if (bmi >= 0 && bmi <= 180) {
        // Calculate the speed based on the BMI value (you may need to adjust this calculation)
        speed = Math.round(bmi);

        // Update the arrow needle's position
        updateArrowPosition(speed);

        currentScale = currentScale + 1;
        // changeActive();
        // changeText();
    }
}

function updateArrowPosition(speed) {

    if(speed>40){
        var arrowNeedle = document.querySelector('.arrow-wrapper');
        arrowNeedle.style.transform = 'rotate(' + 180 + 'deg)';
    }

    let newClass = "speed-" + speed;
    console.log(newClass)
    // let arrowNeedle = document.querySelector(".arrow-wrapper")[0]; 

    const tempElement = document.createElement('div');

    // Apply the CSS class to the temporary element
    tempElement.classList.add(newClass);

    // Append the temporary element to the document (it doesn't need to be visible)
    document.body.appendChild(tempElement);

    // Get the computed styles for the temporary element
    const computedStyles = window.getComputedStyle(tempElement);

    // Extract the 'transform' property value
    const transformValue = computedStyles.getPropertyValue('transform');

    // Split and parse the 'transform' value to get the rotation degree
    const transformMatrix = new DOMMatrix(transformValue);
    const rotationRadian = Math.atan2(transformMatrix.b, transformMatrix.a);
    const rotationDegree = parseFloat((rotationRadian * (180 / Math.PI)).toFixed(1));

    console.log('Rotation Degree:', rotationDegree);

    // Remove the temporary element from the document
    document.body.removeChild(tempElement);


    var arrowNeedle = document.querySelector('.arrow-wrapper');
    arrowNeedle.style.transform = 'rotate(' + rotationDegree + 'deg)';
}

// function changeActive() {
//     let tempClass = "speedometer-scale-" + currentScale;
//     let el = document.getElementsByClassName(tempClass)[0];
//     el.classList.toggle("active");
// }

// function changeText(bmi) {
//     let el = document.getElementsByClassName("km")[0];
//     el.innerText = "BMI: " + bmi;
// }
