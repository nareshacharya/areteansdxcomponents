import { useEffect, useState, useRef } from "react";
import {
  FieldValueList,
  Text,
  EmailDisplay,
  PhoneDisplay,
  URLDisplay,
  withConfiguration,
} from "@pega/cosmos-react-core";
import type { PConnFieldProps } from "./PConnProps";
import "./create-nonce";

// include in bundle
import handleEvent from "./event-utils";
import StatusWorkRenderer from "./StatusWork";
import Rating from "./Rating";

import StyledAreteansExtensionsStarRatingWrapper from "./styles";

// interface for props
interface AreteansExtensionsStarRatingProps extends PConnFieldProps {
  displayAsStatus?: boolean;
  isTableFormatter?: boolean;
  hasSuggestions?: boolean;
  variant?: any;
  formatter: string;
  allowHalf?: boolean;
  showRatingNumber?: boolean;
  starCount?: number;
  fullColor?: string;
  halfColor?: string;
  emptyColor?: string;
  labels?: string[];
  animationScale?: number;
  showClear?: boolean;
  rtl?: boolean;
  fullStarIcon?: React.ReactNode;
  halfStarIcon?: React.ReactNode;
}

// interface for StateProps object
interface StateProps {
  value: string;
  hasSuggestions: boolean;
}

export const formatExists = (formatterVal: string) => {
  const formatterValues = [
    "TextInput",
    "WorkStatus",
    "RichText",
    "Email",
    "Phone",
    "URL",
    "Operator",
  ];
  let isformatter = false;
  if (formatterValues.includes(formatterVal)) {
    isformatter = true;
  }
  return isformatter;
};

export const textFormatter = (formatter: string, value: string) => {
  let displayComponent: any = null;
  switch (formatter) {
    case "TextInput": {
      displayComponent = value;
      break;
    }
    case "Email": {
      displayComponent = (
        <EmailDisplay value={value} displayText={value} variant="link" />
      );
      break;
    }
    case "Phone": {
      displayComponent = <PhoneDisplay value={value} variant="link" />;
      break;
    }
    case "URL": {
      displayComponent = (
        <URLDisplay
          target="_blank"
          value={value}
          displayText={value}
          variant="link"
        />
      );
      break;
    }
    // no default
  }
  return displayComponent;
};

// Duplicated runtime code from Constellation Design System Component

function AreteansExtensionsStarRating(
  props: AreteansExtensionsStarRatingProps,
) {
  const {
    getPConnect,
    validatemessage,
    label,
    hideLabel = false,
    testId,
    displayMode,
    displayAsStatus,
    variant = "inline",
    hasSuggestions = false,
    isTableFormatter = false,
    allowHalf,
    showRatingNumber,
    starCount,
    fullColor,
    halfColor,
    emptyColor,
    labels,
    animationScale,
    showClear,
    rtl,
    fullStarIcon,
    halfStarIcon,
  } = props;
  const { formatter } = props;
  const pConn = getPConnect();
  const actions = pConn.getActionsApi();
  const stateProps = pConn.getStateProps() as StateProps;
  const propName: string = stateProps.value;
  const hasValueChange = useRef(false);

  let { value, readOnly = false, required = false, disabled = false } = props;
  [readOnly, required, disabled] = [readOnly, required, disabled].map(
    (prop) => prop === true || (typeof prop === "string" && prop === "true"),
  );

  const [inputValue, setInputValue] = useState(value);
  const [status, setStatus] = useState(hasSuggestions ? "pending" : undefined);

  // cast status
  let myStatus: "success" | "warning" | "error" | "pending";
  // eslint-disable-next-line prefer-const
  myStatus = status as "success" | "warning" | "error" | "pending";

  useEffect(() => setInputValue(value), [value]);

  useEffect(() => {
    if (validatemessage !== "") {
      setStatus("error");
    }
    if (hasSuggestions) {
      setStatus("pending");
    } else if (!hasSuggestions && myStatus !== "success") {
      setStatus(validatemessage !== "" ? "error" : undefined);
    }
  }, [validatemessage, hasSuggestions, myStatus]);

  // Override the value to render as status work when prop passed to display as status
  if (displayAsStatus) {
    value = StatusWorkRenderer({ value });

    // Fall into this scenario for case summary, default to stacked status
    if (!displayMode) {
      return (
        <FieldValueList
          variant="stacked"
          data-testid={testId}
          fields={[{ id: "status", name: label, value }]}
        />
      );
    }
  }

  if (displayMode === "LABELS_LEFT" || displayMode === "DISPLAY_ONLY") {
    let displayComp = value || <span aria-hidden="true">&ndash;&ndash;</span>;
    if (isTableFormatter && formatExists(formatter)) {
      displayComp = textFormatter(formatter, value);
    }
    return displayMode === "DISPLAY_ONLY" ? (
      <StyledAreteansExtensionsStarRatingWrapper>
        {" "}
        {displayComp}{" "}
      </StyledAreteansExtensionsStarRatingWrapper>
    ) : (
      <StyledAreteansExtensionsStarRatingWrapper>
        <FieldValueList
          variant={hideLabel ? "stacked" : variant}
          data-testid={testId}
          fields={[
            { id: "1", name: hideLabel ? "" : label, value: displayComp },
          ]}
        />
      </StyledAreteansExtensionsStarRatingWrapper>
    );
  }

  if (displayMode === "STACKED_LARGE_VAL") {
    const isValDefined = typeof value !== "undefined" && value !== "";
    const val = isValDefined ? (
      <Text variant="h1" as="span">
        {value}
      </Text>
    ) : (
      ""
    );
    return (
      <StyledAreteansExtensionsStarRatingWrapper>
        <FieldValueList
          variant="stacked"
          data-testid={testId}
          fields={[{ id: "2", name: hideLabel ? "" : label, value: val }]}
        />
      </StyledAreteansExtensionsStarRatingWrapper>
    );
  }

  return (
    <StyledAreteansExtensionsStarRatingWrapper>
      <Rating
        value={inputValue}
        onChange={(val: number) => {
          setInputValue(val);
          handleEvent(actions, "change", propName, val.toString());
          hasValueChange.current = true;
        }}
        readOnly={readOnly}
        allowHalf={allowHalf}
        showRatingNumber={showRatingNumber}
        starCount={starCount}
        fullColor={fullColor}
        halfColor={halfColor}
        emptyColor={emptyColor}
        labels={labels}
        animationScale={animationScale}
        showClear={showClear}
        rtl={rtl}
        fullStarIcon={fullStarIcon}
        halfStarIcon={halfStarIcon}
      />
    </StyledAreteansExtensionsStarRatingWrapper>
  );
}

export default withConfiguration(AreteansExtensionsStarRating);
