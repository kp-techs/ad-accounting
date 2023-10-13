import styled from "styled-components";

export const StyledCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  padding: 20px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.13);
  border-radius: 10px;
`;

export const StyledFilterSection = styled.section`
	box-sizing: border-box;
	font-family: Poppins, Arial, Helvetica, sans-serif;
	font-size: 14px;

	.close {
		display: flex;
		justify-content: flex-end;
		button {
			background-color: transparent;
			border: 0px;
			align-self: flex-end;
			cursor: pointer;
		}
	}
	.container {
		display: flex;
		justify-content: space-between;
		padding: 0;
		box-sizing: border-box;
		gap: 30px;
	}

	input {
		font-family: Poppins, Arial, Helvetica, sans-serif;
		font-size: 14px;
		width: 100%;
		background-color: hsl(0, 0%, 100%);
		border-radius: 4px;
		border: 1px;
		border-color: hsl(0, 0%, 80%);
		border-style: solid;
		outline: 0;
	}

	.field {
		margin-bottom: 15px;
		padding: 2px 8px;
		box-sizing: border-box;
		height: 38px;
	}

	.select {
		margin-bottom: 15px;
	}
	.field-title {
		display: flex;
		align-items: flex-end;

		label {
			font-family: Poppins, Arial, Helvetica, sans-serif;
			font-size: 16px;
			font-weight: 500;
			margin-bottom: 5px;
		}
	}

	.slide-container {
		box-sizing: border-box;
		display: grid;
		width: 100%;
		grid-template-rows: auto 1fr;
	}

	.double-field {
		display: flex;
		flex-direction: column;
	}

	.buttons-container {
		display: flex;
		justify-content: flex-end;
		padding: 10px;
		gap: 15px;

		button {
			width: 93px;
			height: 30px;
			text-align: center;
			justify-content: center;
			font-size: 16px;
			box-sizing: border-box;
			background-color: #eeeeee;
			border-radius: 5px;
			font-family: Poppins, Arial, Helvetica, sans-serif;
			border: 0;
			cursor: pointer;
			&:active {
				background-color: #a4a4a494;
			}
		}
	}
	.field-container{
		display: flex;
		flex-direction: column;
		.text {
			margin: 0;
			font-weight: normal;
			font-style: italic;
		}
	}

	.separation-line {
		border-bottom: 1px solid #0000004f;
		margin: 0;
		padding: 0;
	}

	@media only screen and (max-width:700px){  
    label,button,input {
      font-size: 13px;
    }
	 
	 .container {
		flex-direction: column;
	 }

	 .field-title {
		label {
			font-size: 15px;
		}
	 }

	 .buttons-container {
		button {
			font-size: 14px;
			width: 70px;
		}
	 }

  }
`;




